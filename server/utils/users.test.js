const expect = require('expect')
const { Users } = require('./users')

let users, user, user2, user3;
beforeEach(() => {
  users = new Users()
  user = {
    name: 'Antek',
    id: '111',
    room: 'My test room'
  }
  user2 = {
    name: 'Franek',
    id: '222',
    room: 'My test room 2'
  }
  user3 = {
    name: 'Gocha',
    id: '333',
    room: 'My test room'
  }
})

describe('Users', () => {
  it('should add user to users', () => {
    const u = users.addUser(user.id, user.name, user.room)
    expect(u).toEqual(user)
    // expect(users.users[0]).toBe(user)
  })

  it('should remove user from user by id', () => {
    users.addUser(user.id, user.name, user.room)
    users.addUser(user2.id, user2.name, user2.room)
    users.removeUser('111')
    expect(users.users).toEqual([user2])
    // expect(users.users[0]).toBe(user)
  })

  it('should find user by id', () => {
    users.addUser(user.id, user.name, user.room)
    users.addUser(user2.id, user2.name, user2.room)
    const u = users.getUser('111')
    expect(u).toEqual(user)
    // expect(users.users[0]).toBe(user)
  })
  
  it('should return list of users by room ', () => {
    users.addUser(user.id, user.name, user.room)
    users.addUser(user2.id, user2.name, user2.room)
    users.addUser(user3.id, user3.name, user3.room)
    const uList = users.getUsers('My test room')
    expect(uList).toEqual([user.name, user3.name])
    // expect(users.users[0]).toBe(user)
  })
})