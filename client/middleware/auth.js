export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authUser) {
    console.log("middle",store.state.authUser)
  }
}
