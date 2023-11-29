import Home from "@/app/page"
import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
jest.mock("../src/redux/redux-hooks")
jest.mock("use-resize-observer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}))
describe("Home", () => {
  // beforeEach(() => {
  //   useAppSelector.mockImplementation(testUseSelector)
  // })
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })
  it("it should contain filter", () => {
    act(() => {
      render(<Home />)
    })

    const heading = screen.getByText(/Filter/i)

    expect(heading).toBeInTheDocument()
  })

  // it("contains is", () => {
  //   render(<Home />)

  //   const heading = screen.getByText("is")

  //   expect(heading).toBeInTheDocument()
  // })
})
test("adds 1 + 2 to equal 3", () => {
  function sum(a: any, b: any) {
    return a + b
  }
  expect(sum(1, 2)).toBe(3)
})
