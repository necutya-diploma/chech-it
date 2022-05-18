export default function auth({ next, store }) {
    if (!store.state.auth.status.loggedIn) {
        return next({
            name: 'login'
        })
    }

    return next()
}
