import { Profile } from '../model/types'
import { getProfileDisplayName, getProfileLetters } from '../model/utils'

describe('getProfileLetters', () => {
  it('should return the first two letters of the name capitalized', () => {
    const profile: Profile = {
      email: 'johndoe@example.com',
      name: 'Dan',
    }
    const result = getProfileLetters(profile)
    expect(result).toEqual('DA')
  })

  it('should return the first letter of the first word and the first letter of the second word of the username', () => {
    const profile: Profile = {
      userName: 'jane_doe',
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
    }
    const result = getProfileLetters(profile)
    expect(result).toEqual('JD')
  })

  it('should return the first letter of the email', () => {
    const profile: Profile = {
      email: 'a@example.com',
    }
    const result = getProfileLetters(profile)
    expect(result).toEqual('A')
  })
})

describe('getProfileDisplayName', () => {
  it('should return the userName if it exists', () => {
    const profile: Profile = {
      userName: 'johndoe',
      email: 'johndoe@example.com',
    }
    const result = getProfileDisplayName(profile)
    expect(result).toEqual('johndoe')
  })

  it('should return the email if userName is an empty string', () => {
    const profile: Profile = {
      userName: '',
      email: 'johndoe@example.com',
    }
    const result = getProfileDisplayName(profile)
    expect(result).toEqual('johndoe@example.com')
  })

  it('should return the email if username is empty but name is not', () => {
    const profile: Profile = {
      userName: '',
      email: 'johndoe@example.com',
      name: 'John Doe',
    }
    const result = getProfileDisplayName(profile)
    expect(result).toEqual('johndoe@example.com')
  })

  it('should return the email if neither userName nor name exist', () => {
    const profile: Profile = {
      email: 'johndoe@example.com',
    }
    const result = getProfileDisplayName(profile)
    expect(result).toEqual('johndoe@example.com')
  })

  it('should return the name if it exists', () => {
    const profile: Profile = {
      name: 'John Doe',
      email: '',
    }
    const result = getProfileDisplayName(profile)
    expect(result).toEqual('John Doe')
  })
})
