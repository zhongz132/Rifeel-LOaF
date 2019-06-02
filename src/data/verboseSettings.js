/**
 * verboseSettings.js by zhongz132@gmail.com
 *
 * Settings for what gets printed to the log and console
 */

/**
 * Meanings of each setting:
 * 
 * Note: verboseConsole is always on, and can not be turned off.
 *
 * verboseLog: Will record errors and allowed settings to a text log.
 *
 * statBuild: If true, will record/print stats on the build of the game objects.
 * statBuildFreq: If statBuild, will show the stats every 'x' constructor calls for game object builts.
 * 
 */
const verboseSettings = {
	verboseLog: false,

	statBuild: true,
	statBuildFreq: 20,
}

export default verboseSettings;