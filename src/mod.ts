import { game, initModFeatures, ModCallbackCustom, upgradeMod } from "isaacscript-common"
import { ModCallbackRepentogon } from "isaac-typescript-definitions-repentogon"
import { EntityType, FireplaceVariant, GridEntityType } from "isaac-typescript-definitions"

const name = "Instant Fires and Poops"

export function main(): void {
  const modVanilla = RegisterMod(name, 1)
  const mod = upgradeMod(modVanilla)
  const ModFeatures = [] as const
  mod.AddCallbackRepentogon(
    ModCallbackRepentogon.MC_POST_GRID_HURT,
    onPoopTakeDamage,
    GridEntityType.POOP,
  )

  mod.AddCallbackCustom(
    ModCallbackCustom.ENTITY_TAKE_DMG_FILTER,
    onFireplaceTakeDamage,
    EntityType.FIREPLACE,
    FireplaceVariant.NORMAL,
  )
  initModFeatures(mod, ModFeatures)
}

function onPoopTakeDamage(gridEntity: GridEntity) {
  const room = game.GetRoom()

  if (room.IsClear()) {
    gridEntity.Destroy(false)
  }
}

function onFireplaceTakeDamage(entity: Entity) {
  if (game.GetRoom().IsClear()) {
    entity.Die()
  }

  return true
}
