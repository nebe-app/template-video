# Ukázková šablona pro video kreativy

Ffmpeg helpers:

```
Install ffmpeg
brew install ffmpeg

Get info
ffprobe video.mp4

Get length of video
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.mp4

Convert from mov to mp4
ffmpeg -i input.mov output.mp4

Convert to webm format
ffmpeg -i input.mov -f webm -c:v libvpx -b:v 2M -acodec libvorbis -auto-alt-ref 0 out3.webm -hide_banner
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 2M -pix_fmt yuva420p out4.webm

Extract part of video
ffmpeg -ss 53.8 -i video.mp4 -t 21.122667 -c copy output.mp4

Extract audio from video
ffmpeg -i video.mp4 -vn audio.mp3
ffmpeg -i video.mp4 -vn -acodec copy audio.mp3

Extract video without audio
ffmpeg -i video.mp4 -c copy -an video-noaudio.mp4

Volume up audio
ffmpeg -y -i jingle.wav -filter_complex "[0:0]volume=2.0[out]" -map "[out]" jingle20.wav
```
