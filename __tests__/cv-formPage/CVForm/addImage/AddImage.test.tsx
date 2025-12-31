import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import AddImage from "@/app/(allPages)/cv-form/components/form/addImage/AddImage";
import AddImageTestWrapper from "../../../../app/(allPages)/cv-form/components/form/addImage/AddImageTestWrapper";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "https://placehold.co/400x300");
});

const imageFile = new File(["dummy content"], "test-image.png", {
  type: "image/png",
});

describe("render Add Image To CV 'if template support image' elements", () => {
  it("render main elements", () => {
    render(<AddImage isLoading={false} setImage={jest.fn()} />);

    const theImg = screen.queryByRole("img");
    const fileInput = screen.getByTitle("set-cv-image-input");
    const addImgBtn = screen.getByText("Add Your Image");
    const deleteImgBtn = screen.queryByRole("button", {
      name: "Delete Your Image",
    });
    const resetImgBtn = screen.queryByRole("button", {
      name: "Reset Your Image",
    });

    expect(fileInput).toBeInTheDocument();
    expect(addImgBtn).toBeInTheDocument();
    expect(theImg).not.toBeInTheDocument();
    expect(deleteImgBtn).not.toBeInTheDocument();
    expect(resetImgBtn).not.toBeInTheDocument();
  });

  it("upload unsupported image format and should render an error message holder", async () => {
    render(<AddImageTestWrapper isLoading={false} />);
    const imageFile = new File(["dummy content"], "test-image.webp", {
      type: "image/webp",
    });

    const fileInput = screen.getByTitle("set-cv-image-input");
    let errorMsgHolder = screen.queryByTitle("add image error message holder");

    expect(errorMsgHolder).not.toBeInTheDocument();
    await userEvent.upload(fileInput, imageFile);

    errorMsgHolder = screen.getByTitle("add image error message holder");

    expect(errorMsgHolder).toBeInTheDocument();
    expect(errorMsgHolder).toHaveTextContent(
      "only support .png and .jpg image formats"
    );
  });

  it("render main elements with init image", () => {
    const setImageMockFn = jest.fn();

    render(
      <AddImage
        isLoading={false}
        setImage={setImageMockFn}
        initImgSrc="https://placehold.co/400x300"
      />
    );

    const theImg = screen.queryByRole("img");
    const fileInput = screen.getByTitle("set-cv-image-input");
    const changeImgBtn = screen.getByText("Change Your Image");
    const deleteImgBtn = screen.queryByRole("button", {
      name: "Delete Your Image",
    });
    const resetImgBtn = screen.queryByRole("button", {
      name: "Reset Your Image",
    });

    expect(fileInput).toBeInTheDocument();
    expect(changeImgBtn).toBeInTheDocument();
    expect(theImg).toBeInTheDocument();
    expect(deleteImgBtn).toBeInTheDocument();
    expect(resetImgBtn).not.toBeInTheDocument();
  });
});

describe("click on the btns in the Add Image To CV 'if template support image'", () => {
  it("simulate clicking on the 'Add Your Image' btn", async () => {
    render(<AddImageTestWrapper isLoading={false} />);

    const addImageBtn = screen.getByText("Add Your Image");
    const fileInput = screen.getByTitle("set-cv-image-input");
    let deleteImgBtn = screen.queryByTitle("delete image button");
    let theImg = screen.queryByRole("img");

    expect(addImageBtn).toHaveTextContent("Add Your Image");
    expect(theImg).not.toBeInTheDocument();
    expect(deleteImgBtn).not.toBeInTheDocument();

    await userEvent.upload(fileInput, imageFile);

    const resetImgBtn = screen.queryByRole("button", {
      name: "Reset Your Image",
    });
    theImg = screen.getByRole("img");
    deleteImgBtn = screen.getByTitle("delete image button");

    expect(theImg).toBeInTheDocument();
    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F400x300&w=640&q=75"
    );

    expect(resetImgBtn).not.toBeInTheDocument();
    expect(deleteImgBtn).toBeInTheDocument();
    expect(addImageBtn).toHaveTextContent("Change Your Image");
  });

  it("simulate clicking on the 'Change Your Image' btn with init image", async () => {
    render(
      <AddImageTestWrapper
        isLoading={false}
        initImgSrc="https://placehold.co/500x500"
      />
    );

    const fileInput = screen.getByTitle("set-cv-image-input");
    let deleteImgBtn = screen.getByTitle("delete image button");
    let theImg = screen.getByRole("img");

    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F500x500&w=640&q=75"
    );
    expect(deleteImgBtn).toBeInTheDocument();

    await userEvent.upload(fileInput, imageFile);

    const resetImgBtn = screen.getByRole("button", {
      name: "Reset Your Image",
    });
    theImg = screen.getByRole("img");
    deleteImgBtn = screen.getByTitle("delete image button");

    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F400x300&w=640&q=75"
    );
    expect(resetImgBtn).toBeInTheDocument();
    expect(deleteImgBtn).toBeInTheDocument();
  });

  it("click on the 'Delete Your Image' btn", async () => {
    render(<AddImageTestWrapper isLoading={false} />);

    const addYourImgBtn = screen.getByText("Add Your Image");
    const fileInput = screen.getByTitle("set-cv-image-input");

    expect(addYourImgBtn).toHaveTextContent("Add Your Image");

    await userEvent.upload(fileInput, imageFile);

    let deleteImgBtn = screen.getByTitle("delete image button");

    expect(deleteImgBtn).toBeInTheDocument();
    expect(addYourImgBtn).toHaveTextContent("Change Your Image");

    await userEvent.click(deleteImgBtn);

    const theImg = screen.queryByRole("img");
    deleteImgBtn = screen.queryByTitle("delete image button")!;

    expect(deleteImgBtn).not.toBeInTheDocument();
    expect(theImg).not.toBeInTheDocument();
    expect(addYourImgBtn).toHaveTextContent("Add Your Image");
  });

  it("click on the 'Delete Your Image' btn with init image", async () => {
    render(
      <AddImageTestWrapper
        isLoading={false}
        initImgSrc="https://placehold.co/500x500"
      />
    );

    const chnageYourImgBtn = screen.getByText("Change Your Image");
    let theImg = screen.getByRole("img");
    let deleteImgBtn = screen.getByTitle("delete image button");

    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F500x500&w=640&q=75"
    );
    expect(chnageYourImgBtn).toHaveTextContent("Change Your Image");

    await userEvent.click(deleteImgBtn);

    deleteImgBtn = screen.queryByTitle("delete image button")!;
    theImg = screen.queryByRole("img")!;

    expect(deleteImgBtn).not.toBeInTheDocument();
    expect(theImg).not.toBeInTheDocument();
    expect(chnageYourImgBtn).toHaveTextContent("Add Your Image");
  });

  it("click on the 'Restet Your Image'", async () => {
    render(
      <AddImageTestWrapper
        isLoading={false}
        initImgSrc="https://placehold.co/500x500"
      />
    );

    const chnageYourImgBtn = screen.getByText("Change Your Image");
    const fileInput = screen.getByTitle("set-cv-image-input");
    let theImg = screen.getByRole("img");
    let resetBtn = screen.queryByRole("button", { name: "Reset Your Image" });

    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F500x500&w=640&q=75"
    );
    expect(chnageYourImgBtn).toHaveTextContent("Change Your Image");
    expect(resetBtn).not.toBeInTheDocument();

    await userEvent.upload(fileInput, imageFile);

    resetBtn = screen.getByRole("button", { name: "Reset Your Image" });
    theImg = screen.getByRole("img");

    expect(resetBtn).toBeInTheDocument();
    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F400x300&w=640&q=75"
    );

    await userEvent.click(resetBtn);

    resetBtn = screen.queryByRole("button", { name: "Reset Your Image" });
    theImg = screen.getByRole("img");

    expect(resetBtn).not.toBeInTheDocument();
    expect(theImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fplacehold.co%2F500x500&w=640&q=75"
    );
  });
});

it("disable all btns while loading", () => {
  const setImageMockFn = jest.fn();

  render(
    <fieldset disabled>
      <AddImage
        image={imageFile}
        isLoading
        setImage={setImageMockFn}
        initImgSrc="https://placehold.co/400x300"
      />
    </fieldset>
  );

  const fileInput = screen.getByTitle("set-cv-image-input");
  const changeImgBtn = screen.getByText("Change Your Image");
  const deleteImgBtn = screen.queryByRole("button", {
    name: "Delete Your Image",
  });
  const resetImgBtn = screen.queryByRole("button", {
    name: "Reset Your Image",
  });

  expect(fileInput).toBeDisabled();
  expect(changeImgBtn).toHaveAttribute("aria-disabled", "true");
  expect(deleteImgBtn).toBeDisabled();
  expect(resetImgBtn).toBeDisabled();
});
