## Video

### What is video
__Co__ der + __Dec__ ode = __Codec__

Codec is the algorithm which used for packaging and unpackaging for further streaming and playing.

Encoding is another term for compression. Which makes the size of file, making it easier to transmit over distance. Decoding reverses the process.

Video format is a standarized set of rules for storing containers, codec, meta data and folder structure.

![video-container.png](../images/video-container.png)

Bitrate - rate at which data is encoded per second. The higher it is the higher the quality as more data is transmitted.

The higher the frame rate, more data need to be encoded.

### Containers/Formats
MP4 was not designed with today, and tomorrow’s, internet in mind.

#### Why `WebM`?
`WebM` format provides excellent quality for video files. In addition to that, the playback of this video format is effortless, so the videos in this format can be easily played even on machines with low technical characteristics. This format is perfect for online streaming, and it’s free!

#### WebM vs. MP4
The major difference between these two formats are the video codecs used. WebM uses `VP8` or `VP9` while MP4 is based upon `H.264`. Quality-wise, `VP8` is better than `H.264`.

As for the size of the file, both formats provide relatively similar compression, so the difference in the sizes of the same files of MP4 and WebM formats is not that significant. However, WebM files tend to be a bit smaller than MP4 files.

Another big question is the difference between the total number of devices and programs that support WebM and MP4. There is no doubt that MP4 format is more popular today and it is supported by plenty of smartphones whereas WebM is only supported by Android. The same can be said about software for the playback and editing of the files.

### How to optimize
* Use Image Compression Tools
* Convert to MP4 and webm
* Remove Audio From
* Stream Directly From Your Server
* Specify the Video Size

#### Preload video
This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience with regards to what content is loaded before the video is played. It may have one of the following values:

* `none`: Indicates that the video should not be preloaded.
* `metadata`: Indicates that only video metadata (e.g. length) is fetched.
* `auto`: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.
* _empty string_: Synonym of the `auto` value.
The default value is different for each browser. The spec advises it to be set to `metadata`.

> The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the video for playback.

The specification does not force the browser to follow the value of this attribute; it is a mere hint.

### What can go wrong when lazy loading images and videos
* Layout shifting and placeholders

    Lazy loading media can cause shifting in the layout if placeholders aren't used. These changes can be disorienting for users and trigger expensive DOM layout operations that consume system resources and contribute to jank. At a minimum, consider using a solid color placeholder occupying the same dimensions as the target image, or techniques such as [LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders) (Low Quality Image Placeholders) or [SQIP](https://github.com/technopagan/sqip) (SVG-Based Image Placeholder) that hint at the content of a media item before it loads.

    For `<img>` tags, `src` should initially point to a placeholder until that attribute is updated with the final image URL. Use the `poster` attribute in a `<video>` element to point to a placeholder image. Additionally, use `width` and `height` attributes on both `<img>` and `<video>` tags. This ensures that transitioning from placeholders to final images won't change the rendered size of the element as media loads.

    LQIP’s logic is simple. In a sense, this is like loading progressive JPEGs, except it’s page wide. There are more implementation details below, but it boils down to two main steps:
    * Initially load the page with low quality images

        ```html
        <!-- An image that eventually gets lazy loaded by JavaScript -->
        <img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="I'm an image!">
        ```

    * Once the page loaded (e.g. in the onload event), replace them with the full quality images


### ffmpeg
`-b:v`: specifies the target (average) bit rate for the encoder to use.
