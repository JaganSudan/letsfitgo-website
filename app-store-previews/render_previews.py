from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


W, H = 1284, 2778
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = ROOT / "app-store-previews"

BLUE = (0, 145, 255)
CYAN = (0, 234, 255)
YELLOW = (255, 204, 0)
INK = (6, 10, 18)
DEEP = (7, 10, 18)
NAVY = (10, 24, 39)
WHITE = (255, 255, 255)

FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"


def font(size):
    return ImageFont.truetype(FONT_BLACK, size=size)


def asset(name):
    return Image.open(PUBLIC / name).convert("RGBA")


def paste(base, layer, xy):
    base.alpha_composite(layer, xy)


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size[0], size[1]], radius=radius, fill=255)
    return mask


def smooth_premium_gradient(size):
    """Dark, App Store-style premium gradient using the site's blue/cyan/yellow palette."""
    small_w, small_h = 180, 390
    img = Image.new("RGBA", (small_w, small_h), DEEP + (255,))
    px = img.load()
    for y in range(small_h):
        for x in range(small_w):
            tx = x / (small_w - 1)
            ty = y / (small_h - 1)
            if ty < 0.52:
                mix = ty / 0.52
                color = tuple(round(DEEP[i] * (1 - mix) + NAVY[i] * mix) for i in range(3))
            else:
                mix = (ty - 0.52) / 0.48
                lower = (4, 78, 118)
                color = tuple(round(NAVY[i] * (1 - mix) + lower[i] * mix) for i in range(3))
            side_cool = max(0, 1 - abs(tx - 0.18) / 0.5) * max(0, 1 - abs(ty - 0.58) / 0.62)
            warm_floor = max(0, 1 - ((tx - 0.86) ** 2 / 0.24 + (ty - 0.96) ** 2 / 0.18))
            color = tuple(round(color[i] * (1 - side_cool * 0.26) + CYAN[i] * side_cool * 0.26) for i in range(3))
            color = tuple(round(color[i] * (1 - warm_floor * 0.22) + YELLOW[i] * warm_floor * 0.22) for i in range(3))
            px[x, y] = color + (255,)
    return img.resize(size, Image.Resampling.BICUBIC).filter(ImageFilter.GaussianBlur(0.45))


def radial_glow(size, circles):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for cx, cy, radius, color in circles:
        d.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color)
    return layer.filter(ImageFilter.GaussianBlur(96))


def shadow(base, box, radius, alpha=58, blur=48, offset=(0, 26)):
    x, y, w, h = box
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle(
        [x + offset[0], y + offset[1], x + offset[0] + w, y + offset[1] + h],
        radius=radius,
        fill=(15, 23, 42, alpha),
    )
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def cover(img, size):
    return ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def draw_centered_headline(base, text):
    d = ImageDraw.Draw(base)
    max_width = 1040
    size = 104
    fnt = font(size)
    while d.textlength(text, font=fnt) > max_width:
        size -= 3
        fnt = font(size)
    bbox = d.textbbox((0, 0), text, font=fnt)
    x = (W - (bbox[2] - bbox[0])) / 2
    y = 186
    d.text((x, y), text, font=fnt, fill=WHITE)


def phone_frame(screen_name):
    screen_w = 878
    screen_h = 1902
    border = 42
    outer_w = screen_w + border * 2
    outer_h = screen_h + border * 2
    radius = 116

    frame = Image.new("RGBA", (outer_w, outer_h), (0, 0, 0, 0))
    d = ImageDraw.Draw(frame)

    # This approximates the leaderboard-phone-glow edge from globals.css.
    edge = Image.new("RGBA", (outer_w, outer_h), (0, 0, 0, 0))
    edge_grad = smooth_premium_gradient((outer_w, outer_h))
    edge_grad = Image.blend(edge_grad, Image.new("RGBA", (outer_w, outer_h), CYAN + (255,)), 0.2)
    edge_grad.putalpha(rounded_mask((outer_w, outer_h), radius))
    edge.alpha_composite(edge_grad)
    ed = ImageDraw.Draw(edge)
    ed.rounded_rectangle([0, 0, 48, outer_h], radius=radius, fill=YELLOW + (216,))
    edge.putalpha(rounded_mask((outer_w, outer_h), radius))
    frame.alpha_composite(edge)

    d.rounded_rectangle([16, 16, outer_w - 16, outer_h - 16], radius=102, fill=(2, 4, 8))
    d.rounded_rectangle([border, border, border + screen_w, border + screen_h], radius=78, fill=WHITE)

    screen = cover(asset(screen_name), (screen_w, screen_h))
    screen = ImageEnhanceSafe(screen)
    screen.putalpha(rounded_mask((screen_w, screen_h), 72))
    paste(frame, screen, (border, border))

    notch_w, notch_h = 246, 76
    nx = (outer_w - notch_w) // 2
    d.rounded_rectangle([nx, border + 12, nx + notch_w, border + 12 + notch_h], radius=38, fill=(0, 0, 0))
    return frame


def ImageEnhanceSafe(img):
    # The site uses brightness/contrast/saturation tweaks on these screenshots.
    from PIL import ImageEnhance

    img = ImageEnhance.Brightness(img).enhance(1.03)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = ImageEnhance.Color(img).enhance(1.08)
    return img


def draw_phone(base, screen_name):
    ph = phone_frame(screen_name)
    x = (W - ph.width) // 2
    y = 610

    aura = radial_glow(
        base.size,
        [
            (x + 120, y + 150, 360, BLUE + (94,)),
            (x + ph.width - 128, y + 190, 330, CYAN + (104,)),
            (x + ph.width + 35, y + 980, 360, YELLOW + (66,)),
            (x + ph.width - 210, y + 1510, 420, BLUE + (82,)),
            (x + 190, y + 1630, 420, CYAN + (48,)),
        ],
    )
    base.alpha_composite(aura)
    shadow(base, (x + 24, y + 24, ph.width - 48, ph.height - 48), 108, alpha=112, blur=70, offset=(0, 34))
    paste(base, ph, (x, y))


def make_preview(headline, screen_name):
    base = smooth_premium_gradient((W, H))
    base.alpha_composite(
        radial_glow(
            (W, H),
            [
                (130, 1040, 580, BLUE + (52,)),
                (1160, 1430, 540, CYAN + (44,)),
                (1030, 2530, 640, YELLOW + (74,)),
                (240, 2600, 520, BLUE + (38,)),
            ],
        )
    )
    draw_centered_headline(base, headline)
    draw_phone(base, screen_name)
    return base.convert("RGB")


def main():
    OUT.mkdir(exist_ok=True)
    previews = [
        ("Join Challenges", "how-it-works-create-or-join.png"),
        ("Log Workouts", "how-it-works-log-workout.png"),
        ("Climb the Ranks", "how-it-works-leaderboard.jpg"),
    ]
    for index, (headline, screen_name) in enumerate(previews, start=1):
        path = OUT / f"lfg-app-store-preview-0{index}.png"
        make_preview(headline, screen_name).save(path, "PNG", optimize=True)


if __name__ == "__main__":
    main()
