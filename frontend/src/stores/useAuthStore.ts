import { create } from 'zustand'
import { toast } from 'sonner'
import { authServices } from '@/services/authServices'
import type { AuthState } from '@/types/store'
export const useAuthStore = create<AuthState>((set, get) => (
    {
        accessToken: null,
        user: null,
        loading: false,
        setAccessToken: (accessToken) => {
            set({ accessToken });
        },
        clearState: () => {
            set({
                accessToken: null,
                user: null,
                loading: false,
            })
        },
        signUp: async (username, password, email, firstname, lastname) => {
            try {
                set({ loading: true })
                //goi api 
                await authServices.signUp(username, password, email, firstname, lastname)
                toast.success('Đăng ký thành công!')
            } catch (error) {
                console.error(error)
                toast.error('Đăng ký không thành công!!')
            } finally {
                set({ loading: false })
            }
        },
        signIn: async (username, password) => {
            try {
                set({ loading: true })
                //goi api 
                const { accessToken } = await authServices.signIn(username, password);
                get().setAccessToken(accessToken);
                await get().fetchMe();
                toast.success('Chào mừng quay lại với Emoji 🩷')
            } catch (error) {
                console.error(error)
                toast.error('Đăng nhập không thành công!!')
            } finally {
                set({ loading: false })
            }
        },
        signOut: async () => {
            try {
                get().clearState()
                await authServices.signOut();
                toast.success('Logout thành công!')
            } catch (error) {
                console.error(error)
                toast.error('Lỗi xảy ra khi logout, hãy thử lại')

            }
        },
        fetchMe: async () => {
            try {
                set({ loading: true });
                const user = await authServices.fetchMe();
                set({ user });
            } catch (error) {
                console.error(error);
                set({ user: null, accessToken: null });
                toast.error('Lỗi xảy ra khi lấy dữ liệu người dùng, hãy thử lại !')
            } finally {
                set({ loading: false })
            }
        },
        refresh: async () => {
            try {
                set({ loading: true })
                const { user, fetchMe,setAccessToken } = get();
                const accessToken = await authServices.refresh();
                setAccessToken(accessToken);
                if (!user) {
                    await fetchMe();
                }
            } catch (error) {
                console.error(error)
                toast.error("Phiên đăng nhập đã hết hạn,vui lòng đăng nhập lại!")
                get().clearState();
            } finally {
                set({ loading: false })
            }
        }
    }
))