"use strict";
const Stream = require("stream");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "sender",
	/**
	 * Actions
	 */
	actions: {
		send: {
			async handler(ctx) {
				const participants = [];
				for (let i = 0; i < 100000; i++) {
					participants.push({ entry: i });
				}
				const stream = new Stream.Readable();
				stream.push(Buffer.from(JSON.stringify(participants)));
				stream.push(null);
				this.logger.info("sending stream...");
				await ctx.call("receiver.receive", stream, {
					meta: {
						participants: participants.slice(0, 100), //! this causes the exception
					},
				});
				this.logger.info("finished sending stream");
			},
		},
	},
};
