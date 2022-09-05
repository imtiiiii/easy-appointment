export default function ({ store, redirect }) {
  // If the user is not secureenticated
  if (!store.state.secureUser) {
    // return redirect("/login");
  }
  
}
