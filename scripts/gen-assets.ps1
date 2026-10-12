Add-Type -AssemblyName System.Drawing

# Project root, resolved from the script's own location so this is portable
$root    = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root "public\PP.jpg"
$src = [System.Drawing.Image]::FromFile($srcPath)

function New-Brush([string]$hex, [int]$alpha = 255) {
    $h  = $hex.TrimStart('#')
    $r  = [Convert]::ToInt32($h.Substring(0,2), 16)
    $gc = [Convert]::ToInt32($h.Substring(2,2), 16)
    $b  = [Convert]::ToInt32($h.Substring(4,2), 16)
    $col = [System.Drawing.Color]::FromArgb($alpha, $r, $gc, $b)
    return (New-Object -TypeName System.Drawing.SolidBrush -ArgumentList $col)
}

# Smooth radial gradient fill. Done in C# because PowerShell cannot resolve the
# PathGradientBrush constructor overloads (Point[] / Rectangle / GraphicsPath).
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;

public static class CardFx {
    public static void Radial(Graphics g, Rectangle r, string hex, int peak) {
        int rr = Convert.ToInt32(hex.Substring(0, 2), 16);
        int gg = Convert.ToInt32(hex.Substring(2, 2), 16);
        int bb = Convert.ToInt32(hex.Substring(4, 2), 16);
        using (var path = new GraphicsPath()) {
            path.AddEllipse(r);
            using (var pg = new PathGradientBrush(path)) {
                pg.CenterColor    = Color.FromArgb(peak, rr, gg, bb);
                pg.SurroundColors = new Color[] { Color.FromArgb(0, rr, gg, bb) };
                g.FillPath(pg, path);
            }
        }
    }
}
'@

function Add-Glow($gfx, [int]$x, [int]$y, [int]$w, [int]$h, [string]$hex, [int]$peak) {
    $rct = New-Object -TypeName System.Drawing.Rectangle -ArgumentList @($x, $y, $w, $h)
    [CardFx]::Radial($gfx, $rct, $hex.TrimStart('#'), $peak)
}

# Draws text with manual letter-spacing (System.Drawing has no tracking API).
function Draw-Tracked($gfx, [string]$text, [float]$x, [float]$y, $font, $brush, [float]$tracking) {
    $cursor = $x
    foreach ($ch in $text.ToCharArray()) {
        $gfx.DrawString([string]$ch, $font, $brush, $cursor, $y)
        $cursor += $gfx.MeasureString([string]$ch, $font).Width + $tracking
    }
    return ($cursor - $x - $tracking)
}

function Draw-Crop($gfx, $srcImg, $cropX, $cropY, $crop, $dx, $dy, $dw, $dh) {
    $dest = New-Object -TypeName System.Drawing.Rectangle -ArgumentList @([int]$dx, [int]$dy, [int]$dw, [int]$dh)
    $srcR = New-Object -TypeName System.Drawing.Rectangle -ArgumentList @([int]$cropX, [int]$cropY, [int]$crop, [int]$crop)
    $gfx.DrawImage($srcImg, $dest, $srcR, [System.Drawing.GraphicsUnit]::Pixel)
}

# =========================================================
# 1. dp.png  - 256x256 square avatar (favicon / apple-touch / JSON-LD)
# =========================================================
$rgb = [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
$avatar = New-Object -TypeName System.Drawing.Bitmap -ArgumentList @(256, 256, $rgb)
$ag = [System.Drawing.Graphics]::FromImage($avatar)
$ag.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$ag.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$ag.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
Draw-Crop $ag $src 165 85 300 0 0 256 256
$ag.Dispose()
$avatar.Save((Join-Path $root "public\dp.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$avatar.Dispose()
Write-Output ("wrote public\dp.png (256x256, {0} KB)" -f [int]((Get-Item (Join-Path $root "public\dp.png")).Length / 1KB))

# =========================================================
# 2. og.png - 1200x630 social share card
# =========================================================
$W = 1200; $H = 630
$og = New-Object -TypeName System.Drawing.Bitmap -ArgumentList @($W, $H, $rgb)
$gfx = [System.Drawing.Graphics]::FromImage($og)
$gfx.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$gfx.FillRectangle((New-Brush "#08080A"), 0, 0, $W, $H)

# ambient glows (smooth radial gradients)
Add-Glow $gfx 380 -300 1150 1150 "#D4A85C" 40
Add-Glow $gfx -420 260 950 950 "#CD7F32" 22

# circular portrait + brass ring
$cx = 940.0; $cy = 315.0; $pr = 140.0
$clip = New-Object -TypeName System.Drawing.Drawing2D.GraphicsPath
$clip.AddEllipse([float]($cx - $pr), [float]($cy - $pr), [float]($pr * 2), [float]($pr * 2))
$gfx.SetClip($clip)
# dest MUST match the circle bounds, otherwise the crop gets stretched
Draw-Crop $gfx $src 145 100 340 ([int]($cx - $pr)) ([int]($cy - $pr)) ([int]($pr * 2)) ([int]($pr * 2))
$gfx.ResetClip()
$ringColor = [System.Drawing.Color]::FromArgb(200, 212, 168, 92)
$ring = New-Object -TypeName System.Drawing.Pen -ArgumentList @($ringColor, 2.0)
$gfx.DrawEllipse($ring, [float]($cx - $pr), [float]($cy - $pr), [float]($pr * 2), [float]($pr * 2))
$ring.Dispose()
$clip.Dispose()

# ---- typography ----
$cream = New-Brush "#FAF8F3"
$parch = New-Brush "#C9C1A8"
$muted = New-Brush "#8D846B"
$brass = New-Brush "#D4A85C"

$fEyebrow = New-Object -TypeName System.Drawing.Font -ArgumentList @("Consolas", 11.5, [System.Drawing.FontStyle]::Regular)
$fName    = New-Object -TypeName System.Drawing.Font -ArgumentList @("Segoe UI", 62.0, [System.Drawing.FontStyle]::Bold)
$fRole    = New-Object -TypeName System.Drawing.Font -ArgumentList @("Segoe UI", 19.0, [System.Drawing.FontStyle]::Regular)
$fUrl     = New-Object -TypeName System.Drawing.Font -ArgumentList @("Consolas", 15.0, [System.Drawing.FontStyle]::Regular)

$mid = [char]0x00B7   # middle dot, built from a code point to dodge encoding issues

$eyebrowText = "CHEMISTRY RESEARCHER & QUALITY CONTROL ANALYST"
$wEyebrow = Draw-Tracked $gfx $eyebrowText 92 148 $fEyebrow $brass 2.0

$gfx.DrawString("Sayyad Fayaz", $fName, $cream, 86, 182)
$gfx.DrawString("Ahmad Shah",   $fName, $brass, 86, 250)

$gfx.FillRectangle($brass, 92, 352, 120, 2)

$roleText = "Organic Synthesis $mid Nanomaterials $mid Computational Chemistry"
$gfx.DrawString($roleText, $fRole, $parch, 90, 378)

$urlText = "SAYYADFAYAZ.VERCEL.APP"
$wUrl = Draw-Tracked $gfx $urlText 92 470 $fUrl $muted 1.8

$gfx.Dispose()
# JPEG at q90 — the card has no transparency, and this is ~3x smaller than PNG.
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, 90L)
$ogPath = Join-Path $root "public\og.jpg"
$og.Save($ogPath, $jpegCodec, $encParams)
$og.Dispose()

# drop any previous PNG build of the card
$oldPng = Join-Path $root "public\og.png"
if (Test-Path $oldPng) { Remove-Item $oldPng -Force }

Write-Output ("wrote public\og.jpg (1200x630, {0} KB)" -f [int]((Get-Item $ogPath).Length / 1KB))
Write-Output ("  eyebrow width : {0}px (text area ends at 780, circle starts at {1})" -f [int]$wEyebrow, [int]($cx - $pr))
Write-Output ("  url width     : {0}px" -f [int]$wUrl)
$src.Dispose()
Write-Output "done"