class Users {
  constructor() {
    this.users = []
  }
  addUser(id, name, room) {
    //console.log('dustructed user',id, name, room)
    this.users.push({id, name, room})
    return this.users[this.users.length - 1]
  }
  removeUser(id) {
    let removedUser
    this.users = this.users.filter(user => {
      if (user.id === id) {
        removedUser = user
        return false
      } else {
        return true
      }
    })
    return removedUser
  }
  getUser(id) {
    return this.users.find(user => user.id === id)
  }
  getUsers(room) {
    return this.users.reduce((names, user) => user.room === room && names.push(user.name) && names || names, [] )
    // return this.users.reduce((names, user) => {
    //   if (user.room === room) {
    //     names.push(user.name)
    //   }
    //   return names
    // }, [])
    // return this.users.filter(user => user.room === room).map(user => user.name)
  }
}


let users, user, user2, user3;
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

users.addUser(user.id, user.name, user.room)
users.addUser(user2.id, user2.name, user2.room)
users.addUser(user3.id, user3.name, user3.room)
const uList = users.getUsers('My test room')
console.log(uList)

module.exports.Users = Users
