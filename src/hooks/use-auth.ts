import { useAppSelector } from './redux-hooks';

export function useAuth(type?: boolean) {
    const {email, token, id} = useAppSelector(state => state.user);

    return {
        isAuth: !!email || type,
        email,
        token,
        id,
    };
}