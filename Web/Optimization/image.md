## Optimize image assets

* Use Image Compression Tools
* Choose right format
* Reduce image size
* Image placeholder
* Lazy loading images
* Intersection Observer API

#### Lossy Compression
The first form of compression is lossy. Lossy compression involves eliminating some of the data in your image. Because of this, it means you might see degradation (reduction in quality or what some refer to as pixelated). So you have to be careful by how much you’re reducing your image. Not only due to quality, but also because you can’t reverse the process. Of course, one of the great benefits of lossy compression and why it’s one of the most popular compression methods is that you can reduce the file size by a very large amount.

> JPEGs is lossy image formats.

#### Lossless Compression
Now it’s time to dive into the second form of compression which is lossless. Lossless compression, unlike lossy, doesn’t reduce the quality of the image. How is this possible? It’s usually done by removing unnecessary metadata (automatically generated data produced by the device capturing the image). However, the biggest drawback to this method is that you won’t see a significant reduction in file size.

> GIF, and PNG are lossless image formats.

### JPG/JPEG (Joint Photographic Experts Group)
JPGs can support millions of colors, so this file type is ideal for real-life images, like photographs.

The JPG is “lossy” - which means that when the data is compressed, unnecessary information is deleted from the file permanently. That means that some quality will be lost or compromised when any file is converted to a JPG.

Think of JPG as the default file format for uploading pictures to the web, unless they need transparency, have text in them, are animated, or would benefit from color changes (like logos or icons).

### GIF (Graphics Interchange Format)
GIFs are “lossless” - meaning that a GIF retains all the data contained in the file, but they are smaller than JPGs, specifically because they only accommodate up to 256 indexed colors.

GIF was intended for small, simple graphic icons, but with one important caveat - they can be animated! There is no audio associated with a GIF, but they are still a powerful way to bring motion to your online channels.

### SVG (Scalable Vector Graphics)
Unlike raster formats seen in JPG, GIF, and PNG, an SVG image remains crisp and clear at any resolution or size.

That’s because an SVG is drawn from mathematically declared shapes and curves, not pixels. SVG’s can be animated, support transparency, and any combinations of colors or gradients.

SVG is a lossless file format like GIF and PNG, and they tend to be fairly large files when compared with other formats for the web.

### WebP
WebP is an image format that utilizes both lossy and lossless compression formats. Being able to create images that use mixed compression formats lets you create richer images that are smaller in file size than other formats.

WebP essentially combines the features of all other image formats (JPEG, PNG, and GIF) together in a surprisingly seamless way. WebP offers file sizes that are around 30% smaller than JPEG without a quality gap. It also provides transparency (alpha channel) like PNG, and the ability to animate images like the GIF format.

So, usually lossy compression images are much smaller in size than lossless compression images, but they suffer a quality loss. Lossy compression also has the disadvantage of generation loss. Every time you compress the same image using lossy compression it becomes less and less recognizable.

Even though WebP was announced in 2010, it isn’t universally compatible as of yet. It’s 100% compatible for anyone that’s using Chrome or Opera (which accounts for around 63% of users.) Currently, neither Firefox nor Safari natively support WebP without plugins.

#### WebP vs. PNG
Essentially WebP offers the following benefits over PNG.

WebP offers 26% smaller file sizes than PNG, while still providing transparency and the same quality.

WebP loads faster (due to file size) than PNG images.

#### WebP vs. JPEG
WebP offers 25 – 35% smaller file sizes at the exact same SSIM quality index, which means that WebP images have smaller file sizes with the same quality.

#### WebP vs. GIF
Sure, WebP is better than GIF. It offers the same quality at a smaller file size.

WebP is an absolutely amazing image format for website designers, and it would be a mistake not to utilize WebP’s impressive quality-to-size ration on your website. It will make your site load faster and look better.

#### GIF vs. Video
GIFs were actually designed to hold multiple images in a single file, kind of like a ZIP file for images. And that’s how they were used until Netscape 2.0 came along in 1995 and introduced the looping extension that set GIF animations free, bringing them to life.

Besides being fun to use, GIFs have several benefits:
* Universally supported by browsers
* Universally understood. Everyone knows what GIF is
* Easy-to-use and widely available tools for creating them
* No patent or licensing concerns that apply to common video codecs
* Easy to insert in sites using img
* Easy to share on social platforms

> Unlike actual, video formats, GIFs don’t use any kind of video encoding or compression techniques. So a GIF that’s only a few seconds long can quickly blow out to several megabytes in size, depending on the frame rate and quality.

On top of that GIFs lack the quality of video and have color limitations and slower frame rates.

But the biggest problem of all with GIFs is their file size. While JPEG and PNG files can be easily compressed, GIF animations are a nightmare to optimize because the more you compress them, the worse they look, making them less than ideal for use on modern websites.

While video can take more time to encode, HTML5 does offer a number of advantages compared to GIF:

* Easy to insert videos in sites using `<video>`
* Small file size
* Better performance
* More colors and detail

### Conclusion
If you’re uploading vacation pictures to Facebook, JPG is the winner. You want to make a short, hilarious animation from your favourite movie scene? GIF. If you’re going to be using high quality images, detailed icons or need to preserve transparency, PNG is the winner. SVG is ideal for high quality images and can be scaled to ANY size.
