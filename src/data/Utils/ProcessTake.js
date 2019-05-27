/**
 * ProcessTake.js by zhongz132@gmail.com
 *
 * Processes the take request for quests, spars, and battles.
 */

function ProcessTake(state, take) {
	for (let key in take) {
		switch (key) {
			case "item":
				let newInventory = [...state.player.inventory];
				for (let i in take[key]) {
					console.log(newInventory)
					if (newInventory.includes(take[key][i])) {
						newInventory = newInventory.filter(item => item !== take[key][i]);
						console.log(newInventory)
					}
				}
				state = state.merge({
					player: state.player.merge({
						inventory: newInventory
					})
				});
				break;
			case "gold":
				state = state.merge({
					gold: state.gold - take[key]
				});
				break;
			default:
				console.log("Invalid take type, ", key);
		}
	}

	return state;
}

export default ProcessTake;
