"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "receiver",
	/**
	 * Actions
	 */
	actions: {
		receive: {
			async handler(ctx) {
				// ! called two times if meta is "large"
				this.logger.info("call receive handler", ctx.params, ctx.meta);
				const participants = [];
				ctx.params.on("data", (d) => participants.push(d));
				ctx.params.on("end", () =>
					this.logger.info(
						"received stream data",
						participants.length,
						ctx.meta
					)
				);
			},
		},
	},
};
