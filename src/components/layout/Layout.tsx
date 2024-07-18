import { Layout as GOTELayout, LayoutProps } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';


// const useStyles = makeStyles({
//     root: { paddingBottom: (props: { addPadding: any; }) => (props.addPadding ? '80px' : 0) },
// })

const Layout = (props: LayoutProps) => {
    // const queue = useSelector((state: any) => state.player?.queue)
    // const classes = useStyles({ addPadding: queue.length > 0 })
    // const dispatch = useDispatch()
    // const keyHandlers = {
    // TOGGLE_MENU: useCallback(() => dispatch(toggleSidebar()), [dispatch]),
    // }

    return (

        <GOTELayout
            {...props}
            // className={classes.root}
            menu={Menu}
            appBar={AppBar}
        // notification={Notification}
        />

    )

}



export default Layout
