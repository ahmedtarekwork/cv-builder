import DeleteImgBtn from "@/app/(allPages)/cv-form/components/form/addImage/DeleteImgBtn";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Delete Image From CV Button", () => {
  it("click on 'Delete Your Image' btbn", async () => {
    const handleRemoveImgMockFn = { mock: jest.fn() };
    const spy = jest.spyOn(handleRemoveImgMockFn, "mock");

    render(<DeleteImgBtn handleRemoveImg={handleRemoveImgMockFn.mock} />);

    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Delete Your Image");

    await userEvent.click(btn);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("delete");
  });
});
