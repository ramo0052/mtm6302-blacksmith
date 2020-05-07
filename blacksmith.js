/**
 * randomInt:
 * Returns a random positive integer from min to max
 * @Parameters: min - the smallest possible number, max - largest possible number
 * @Return: Int
 * @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const randomInt = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  /**
   * The settings object keeps track of all the exchange rates
   * for the game.
   */
  const settings = {
    fireWood: 1,
    oreCost: 3,
    woodCost: 1,
    swordOre: 2,
    swordWood: 1,
    axeOre: 1,
    axeWood: 2,
    swordPriceMin: 5,
    swordPriceMax: 10,
    axePriceMin: 4,
    axePriceMax: 8
  }
  
  /**
   * The game object stores the current game status
   */
  const game = {
    fire: false,
    wood: 1,
    ore: 1,
    sword: 1,
    axe: 1,
    gold:7,
  }
  /**
 * fire
 * To start a fire:
 *    The fire must be out
 *    There must be at least 1 piece of wood
 *
 * To stop a fire:
 *    The fire must be going
 */
  function fire () {
      if (game.fire) {
        game.fire = false  
        return 'You put out the fire!'
      } else if (settings.fireWood >= 1) {
        game.fire = true  
        settings.fireWood -= 1
        return 'You start the fire'
  } else {
    return 'You dont have wood to start the fire.'
    }
  }
/**
 * buy
 * To buy wood or ore
 *    The function must accept a string argument
 *    The argument is the item to buy
 *    The fire most not be burning
 *    The player must have enough gold
 *    The player will on receive 1 item
 */  
   function buy (item) {
     if (game.fire === false) {
     if (item === 'ore' && game.gold >= settings.oreCost){
       game.ore += 1
       game.gold -= settings.oreCost
       return "You bought 1 piece of ore!" 
     } else if(item === 'wood' && game.gold >= settings.woodCost){
        game.wood += 1
        game.gold -= settings.woodCost
        return "You bought 1 piece of wood!"
     } else {
       return `You cannot buy ${item}`
     }
   } else {
     return "You must put out the fire."
   }
  }
 /**
   * inventory
   * Shows the players current inventory
   */
  function inventory () {
    const responses = []
    for (const item in game) {
      if (item === 'fire'){
        if (game.fire) {
          responses.push('The fire is burning.')
        } else {
          responses.push('The fire is out')
        }
      }else {
        responses.push(`${item}: ${game[item]}`)
      }
    }
    return responses.join('\n') // \n make new line for each item
  }

  //MAKE: 1 sword with 2 pieces of ore and 1 piece of wood
  //MAKE: 1 axe with 1 piece of ore and 2 pieces of wood
    /** return "To make a sword you must have to put out fire."
   * To make a sword or axe
   *    The function must accept a string argument
   *    The argument is the item to make
   *    The fire must be burning
   *    The player must have enough wood and ore
   *    The player will make 1 item
   */
  
  function make (item) {
    if (game.fire) {
      if (item === 'sword' && game.ore >= settings.swordOre && game.wood >= settings.swordWood) {
        game.wood -= settings.swordWood
        game.ore -= settings.swordOre
        game.swords++
        return "Smart guy! You made 1 sword."
      } else if (item === 'axe' && game.ore >= settings.axeOre && game.wood >= settings.axeWood) {
        game.wood -= settings.axeWood
        game.ore -= settings.axeOre
        game.axe++
        return "Smart guy! You made 1 axe."
      }else {
        return `You cannot make a(n) ${item}.`
      }
    } else {
      return "You must have to start the fire."
  }
  }

  /**
   * sell
   * To sell a sword or axe
   *   The function must accept a string argument
   *   The argument is the item to sell
   *   The function must check if it is a valid item to sell
   *   The fire must not be burning
   *   The player must have at least 1 item to sell
   *   The player will receive a random value based on the
   *   price range
   */
  
   function sell (item) {
     if (game.fire) {
       if (item === 'sword' && game.sword >=1) {
        game.sword--
        const price = randomInt(settings.swordPriceMin, settings.swordPriceMax)
        game.gold += price
        return `You sold 1 ${item} for ${price} pieces of gold.`
       }else if (item === 'axe' && game.axe >=1) {
        game.axe--
        const price = randomInt(settings.swordPriceMin, settings.swordPriceMax)
        game.gold += price
        return `You sold 1 ${item} for ${price} pieces of gold.`
        } else {
        return `You dont have ${item} to sell.`
        }
       } else {
        return "You must have to put out the fire." 
     }
   }
 
  /**
   * Help Command
   * Returns the instruction on how to play the game.
   */
  function help () {
    return `INSTRUCTIONS:
  Blacksmith is a simple text base game. 
  
  As a blacksmith you convert ore and wood into swords and axes. You buy your resources using gold and sell your weapons for gold.
  
  COMMANDS:
  - buy(item)
  - make(item)
  - sell(item)
  - fire()
  - inventory()
  - help()`
  }
  
  // Log the help() function
  console.log(help())
