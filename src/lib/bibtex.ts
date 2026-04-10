export interface BibtexEntry {
  type: string
  key: string
  fields: Record<string, string>
  raw: string
}

function skipWhitespace(source: string, start: number) {
  let index = start
  while (index < source.length && /[\s,]/.test(source[index])) {
    index += 1
  }
  return index
}

function readBalancedValue(source: string, start: number, openChar: string, closeChar: string) {
  let index = start + 1
  let depth = 1

  while (index < source.length && depth > 0) {
    const char = source[index]
    if (char === openChar) {
      depth += 1
    } else if (char === closeChar) {
      depth -= 1
    }
    index += 1
  }

  return {
    value: source.slice(start + 1, index - 1).trim(),
    nextIndex: index,
  }
}

function readQuotedValue(source: string, start: number) {
  let index = start + 1
  let escaped = false

  while (index < source.length) {
    const char = source[index]
    if (char === '"' && !escaped) {
      break
    }
    escaped = char === '\\' && !escaped
    if (char !== '\\') {
      escaped = false
    }
    index += 1
  }

  return {
    value: source.slice(start + 1, index).trim(),
    nextIndex: index + 1,
  }
}

function readBareValue(source: string, start: number) {
  let index = start
  while (index < source.length && source[index] !== ',') {
    index += 1
  }

  return {
    value: source.slice(start, index).trim(),
    nextIndex: index,
  }
}

function parseFields(body: string) {
  const fields: Record<string, string> = {}
  let index = 0

  while (index < body.length) {
    index = skipWhitespace(body, index)
    if (index >= body.length) {
      break
    }

    const equalIndex = body.indexOf('=', index)
    if (equalIndex === -1) {
      break
    }

    const fieldName = body.slice(index, equalIndex).trim().toLowerCase()
    index = skipWhitespace(body, equalIndex + 1)

    if (!fieldName || index >= body.length) {
      break
    }

    let parsedValue: { value: string; nextIndex: number }

    if (body[index] === '{') {
      parsedValue = readBalancedValue(body, index, '{', '}')
    } else if (body[index] === '"') {
      parsedValue = readQuotedValue(body, index)
    } else {
      parsedValue = readBareValue(body, index)
    }

    fields[fieldName] = parsedValue.value.replace(/\s+/g, ' ').trim()
    index = parsedValue.nextIndex
  }

  return fields
}

export function parseBibtex(source: string) {
  const entries: BibtexEntry[] = []
  let index = 0

  while (index < source.length) {
    const atIndex = source.indexOf('@', index)
    if (atIndex === -1) {
      break
    }

    const openIndex = source.indexOf('{', atIndex)
    if (openIndex === -1) {
      break
    }

    const type = source.slice(atIndex + 1, openIndex).trim().toLowerCase()
    let cursor = openIndex + 1
    let depth = 1

    while (cursor < source.length && depth > 0) {
      const char = source[cursor]
      if (char === '{') {
        depth += 1
      } else if (char === '}') {
        depth -= 1
      }
      cursor += 1
    }

    const raw = source.slice(atIndex, cursor).trim()
    const payload = source.slice(openIndex + 1, cursor - 1)
    const commaIndex = payload.indexOf(',')

    if (commaIndex !== -1) {
      const key = payload.slice(0, commaIndex).trim()
      const body = payload.slice(commaIndex + 1)
      entries.push({
        type,
        key,
        fields: parseFields(body),
        raw,
      })
    }

    index = cursor
  }

  return entries
}
