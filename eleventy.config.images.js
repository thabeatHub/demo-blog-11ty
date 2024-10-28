const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("horizontalImg", async function imageShortcode(src, alt, widths, sizes) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		//console.log(widths);
		let formats = ["avif", "webp", "auto"];
		let file = relativeToInputPath(this.page.inputPath, src);
		let metadata = await eleventyImage(file, {
			widths: widths || ["auto"],
			formats,
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				//const reldirectory = path.relative(eleventyConfig.dir.input, path.dirname(src))
				//const outdirectory = path.join(eleventyConfig.dir.output, "img");
				// console.log(eleventyConfig.dir.input);
				// console.log(path.relative(eleventyConfig.dir.input, path.dirname(src)));
				// console.log(path.join(eleventyConfig.dir.output, "img"));

				return `${name}-${width}w.${format}`;
			},
			urlPath: path.join(
				"/img",
				path.relative(
					path.resolve(eleventyConfig.dir.input),
					path.dirname(relativeToInputPath(this.page.inputPath, src))
				)
			),
			outputDir: 
				path.join(
					eleventyConfig.dir.output, 
					"img", 
					path.relative(
						path.resolve(eleventyConfig.dir.input), 
						path.dirname(relativeToInputPath(this.page.inputPath, src))
				)
			), 
			// Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			class: "post-image horizontal-img rounded mx-auto d-block col-12 col-md-6 float-md-start mb-3 py-2 pe-md-4",
			loading: "lazy",
			decoding: "async",
		};
		// console.log(src);
		//console.log(imageAttributes);
		//console.log(metadata);
		//console.log(relativeToInputPath(this.page.inputPath, src));
		//console.log(path.resolve(src));
		//console.log(path.relative(path.resolve(eleventyConfig.dir.input), path.dirname(relativeToInputPath(this.page.inputPath, src))));
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});

	eleventyConfig.addAsyncShortcode("verticalImg", async function imageShortcode(src, alt, widths, sizes) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		//console.log(widths);
		let formats = ["avif", "webp", "auto"];
		let file = relativeToInputPath(this.page.inputPath, src);
		let metadata = await eleventyImage(file, {
			widths: widths || ["auto"],
			formats,
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				//const reldirectory = path.relative(eleventyConfig.dir.input, path.dirname(src))
				//const outdirectory = path.join(eleventyConfig.dir.output, "img");
				// console.log(eleventyConfig.dir.input);
				// console.log(path.relative(eleventyConfig.dir.input, path.dirname(src)));
				// console.log(path.join(eleventyConfig.dir.output, "img"));

				return `${name}-${width}w.${format}`;
			},
			urlPath: path.join(
				"/img",
				path.relative(
					path.resolve(eleventyConfig.dir.input),
					path.dirname(relativeToInputPath(this.page.inputPath, src))
				)
			),
			outputDir: 
				path.join(
					eleventyConfig.dir.output, 
					"img", 
					path.relative(
						path.resolve(eleventyConfig.dir.input), 
						path.dirname(relativeToInputPath(this.page.inputPath, src))
				)
			), 
			// Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			class: "post-image vertical-img rounded mx-auto d-block col-12 col-md-4 float-md-start mb-3 py-2 pe-md-4",
			loading: "lazy",
			decoding: "async",
		};
		// console.log(src);
		//console.log(imageAttributes);
		//console.log(metadata);
		//console.log(relativeToInputPath(this.page.inputPath, src));
		//console.log(path.resolve(src));
		//console.log(path.relative(path.resolve(eleventyConfig.dir.input), path.dirname(relativeToInputPath(this.page.inputPath, src))));
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};
