import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../slice/ui-slice"

export default function DrawerCard() {
  const dispatch = useDispatch<AppDispatch>()
  const drawerOpened = useSelector((state: RootState) => state.ui.drawerOpened)
  const drawerContent = useSelector((state: any) => state.ui.drawerContent)
  const drawerStyles = useSelector((state: any) => state.ui.drawerStyles)

  const styles = {
    main: {
      backgroundColor: "rgba(137, 146, 163, 0.1)",
      zIndex: 16000,
      position: "fixed",
      top: 1,
      right: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      overflowY: "scroll",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "24px",
      bgcolor: "#FFFFFF",
    } as React.CSSProperties,
    mobile: {
      backgroundColor: "white",
      width: "95vw",
      overflowY: "auto",
      height: "70vh",
      bottom: 0,
      maxHeight: "70vh",

      position: "absolute",
    } as React.CSSProperties,
    desktop: {
      backgroundColor: "white",
      width: 483,
      overflowY: "auto",
      height: "100vh",
      top: 0,
      right: 0,
      position: "absolute",
    } as React.CSSProperties,
  }

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(uiActions.closedrawer())
  }
  return (
    <>
      {drawerOpened ? (
        <div
          style={{
            ...styles.main,

            zIndex: 1600000,
          }}
          onClick={(e) => Close(e)}
        >
          <div
            style={{
              ...drawerStyles,
            }}
            className="absolute bg-white overflow-auto w-[95vw] md:w-[483px] h-[70vh]  max-h-[70vh] md:max-h-screen md:h-screen bottom-0 md:bottom-auto md:top-0 md:right-0"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div
              className="text-3xl text-darkPurple absolute top-7 right-5 "
              onClick={(e) => Close(e)}
            >
              &times;
            </div>
            <div>{drawerContent}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
