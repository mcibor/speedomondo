var config = {
  port: {
    name: "speedomondo"
  },
  request: {
    checkUrl: "checkUrl",
    newWorkout: "newWorkout",
    home: "home"
  },
  response: {
    workout: "workout",
    home: "home"
  },
  patt: {
    workout: /endomondo.*users.*workouts/,
    home: /endomondo.*home/
  }
}