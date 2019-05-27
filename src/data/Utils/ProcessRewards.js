/**
 * ProcessRewards.js by zhongz132@gmail.com
 *
 * Processes the rewards for quests, spars, and battles.
 */

export default function ProcessRewards(state, reward) {
	for (var key in reward) {
		switch (key) {
			case "inf":
				state = state.merge({
					player: state.player.merge({
						inf: state.player.inf + reward[key]
					})
				});
				break;
			case "rep":
				state = state.merge({
					player: state.player.merge({
						rep: state.player.rep + reward[key]
					})
				});
				break;
			case "gold":
				state = state.merge({ gold: state.gold + reward[key] });
				break;
			case "item":
				state = state.merge({
					player: state.player.merge({
						inventory: [...state.player.inventory, reward[key]]
					})
				});
				break;
			case "skill":
				state = state.merge({
					player: state.player.merge({
						skill: [...state.player.skill, reward[key]]
					})
				});
				break;
			case "atk":
				state = state.merge({
					player: state.player.merge({
						atk: state.player.atk + reward[key]
					})
				})
				break;
			case "def":
				state = state.merge({
					player: state.player.merge({
						def: state.player.def + reward[key]
					})
				})
				break;
			case "agi":
				state = state.merge({
					player: state.player.merge({
						agi: state.player.agi + reward[key]
					})
				})
				break;
			case "cst":
				state = state.merge({
					player: state.player.merge({
						cst: state.player.cst + reward[key]
					})
				})
				break;
			case "health":
				state = state.merge({
					player: state.player.merge({
						health: state.player.health + reward[key]
					})
				})
				break;
			default:
				console.log("Invalid reward type: " + key);
		}
	}

	return state
}
