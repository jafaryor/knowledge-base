# Plugins

Name | Description
---- | -----------
AggressiveSplittingPlugin | Splits the original chunks into smaller chunks, splitting every chunk until it reaches the specified __maxSize__ configured in __options__
BabelMinifyWebpackPlugin | Minification with babel-minify
BannerPlugin | Add a banner to the top of each generated chunk
CommonsChunkPlugin | Extract common modules shared between chunks
ComponentWebpackPlugin | Use components with webpack
CompressionWebpackPlugin | Prepare compressed versions of assets to serve them with Content-Encoding
ContextReplacementPlugin | Allows to verride the inferred context of a require expression
DefinePlugin | Allow global constants configured at compile time
DllPlugin | Split bundles in order to drastically improve build time
EnvironmentPlugin | Shorthand for using the DefinePlugin on process.env keys
ExtractTextWebpackPlugin | Extract text (CSS) from your bundles into a separate file
HotModuleReplacementPlugin | Enable Hot Module Replacement (HMR)
HtmlWebpackPlugin | Easily create HTML files to serve your bundles
I18nWebpackPlugin | Add i18n support to your bundles
IgnorePlugin | Exclude certain modules from bundles
LimitChunkCountPlugin | Set min/max limits for chunking to better control chunking
LoaderOptionsPlugin | Used for migrating from webpack 1 to 2
MinChunkSizePlugin | Keep chunk size above the specified limit
NoEmitOnErrorsPlugin | Skip the emitting phase when there are compilation errors. This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
NormalModuleReplacementPlugin | Replace resource(s) that matches a regexp with new resource
NpmInstallWebpackPlugin | Auto-install missing dependencies during development
ProvidePlugin | Automatically load modules instead of having to __import__ or __require__ them everywhere
SourceMapDevToolPlugin | Enables a more fine grained control of source maps
EvalSourceMapDevToolPlugin | Enables a more fine grained control of eval source maps
UglifyjsWebpackPlugin | Enables control of the version of UglifyJS in your project
ZopfliWebpackPlugin | Prepare compressed versions of assets with node-zopfli