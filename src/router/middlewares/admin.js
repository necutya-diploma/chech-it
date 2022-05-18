export default function admin({ next, store }) {
    if (!(store.state.auth.user && store.state.auth.user.role === 'admin')) {
        return next({
            name: 'login'
        })
    }

    return next()
}