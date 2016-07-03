var config = {
  port: {
    name: "speedomondo"
  },
  request: {
    checkUrl: "checkUrl",
    newWorkout: "newWorkout",
    other: "other"
  },
  response: {
    workout: "workout",
    other: "other"
  },
  patt: {
    workout: /endomondo.*users.*workouts/,
    endomondo: /endomondo/
  }
}