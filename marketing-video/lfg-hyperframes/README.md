# LFG Hyperframes Marketing Video

This is a standalone Hyperframes composition for a 20-second LFG social fitness accountability marketing video.

Final render: `renders/lfg-social-fitness.mp4` (20 seconds, 1920x1080, 30fps).

## Files

- `index.html` - renderable Hyperframes composition
- `SCRIPT.md` - on-screen script and beat structure
- `STORYBOARD.md` - scene-by-scene creative plan
- `assets/` - local copies of the LFG visual assets used by the composition
- `renders/` - target folder for MP4 exports
- `snapshots/` - target folder for key-frame captures

## Preview

```bash
npx hyperframes preview marketing-video/lfg-hyperframes
```

## Render

```bash
npx hyperframes render marketing-video/lfg-hyperframes --output marketing-video/lfg-hyperframes/renders/lfg-social-fitness.mp4 --fps 30 --quality high
```

## Snapshot QA

```bash
npx hyperframes snapshot marketing-video/lfg-hyperframes --at 1,5,9,13,17
```

## Layout QA

```bash
npx hyperframes inspect marketing-video/lfg-hyperframes --at 1,5,9,13,17 --json
```
