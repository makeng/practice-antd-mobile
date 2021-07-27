import {ComponentType} from 'react'

export function attachPropertiesToComponent<
  C extends ComponentType,
  P extends {}
>(component: C, properties: P): C & P {
  const ret = component as any
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key]
    }
  }
  return ret
}
