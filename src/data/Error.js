/**
 * Error.js by zhongz132@gmail.com
 *
 * Handles errors
 */

/**
 * Notes:
 * 
 * 20: Invalid Id
 * 30: Function does not exist
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

const Error = {
	IdInvalid: function(id) {
		this.message = "Id: " + id + " invalid."
	}
}