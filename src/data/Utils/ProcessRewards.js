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
				let newInventory = [...state.player.inventory];
				newInventory.push(reward[key]);
				state = state.merge({
					player: state.player.merge({
						inventory: newInventory
					})
				});
				break;
			case "skill":
				let newSkill = [...state.player.skill];
				if (!newSkill.includes(reward[key])) {
					newSkill.push(reward[key]);
					state = state.merge({
						player: state.player.merge({
							skill: newSkill
						})
					});
				}
				break;
			case "passive":
				let newPassive = [...state.player.passive];
				if (!newPassive.includes(reward[key])) {
					newPassive.push(reward[key]);
					state = state.merge({
						player: state.player.merge({
							passive: newPassive
						})
					});
				}
				break;
			case "atk":
				state = state.merge({
					player: state.player.merge({
						atk: state.player.atk + reward[key]
					})
				});
				break;
			case "def":
				state = state.merge({
					player: state.player.merge({
						def: state.player.def + reward[key]
					})
				});
				break;
			case "agi":
				state = state.merge({
					player: state.player.merge({
						agi: state.player.agi + reward[key]
					})
				});
				break;
			case "cst":
				state = state.merge({
					player: state.player.merge({
						cst: state.player.cst + reward[key]
					})
				});
				break;
			case "health":
				state = state.merge({
					player: state.player.merge({
						health: state.player.health + reward[key]
					})
				});
				break;
			default:
				console.log("Invalid reward type: " + key);
		}
	}

	return state;
}
