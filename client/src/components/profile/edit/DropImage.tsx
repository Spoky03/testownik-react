import { Input } from "@/components/ui/input";
import Compressor from "compressorjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Question } from "@/types";
import userService from "@/services/userService";

export const DropImage = ({ question }: { question: Question }) => {
  const form = new FormData();
  console.log(question);
  const handleCompressedUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files && event.target.files[0];
    if (!image) return;
    new Compressor(image, {
      quality: 0.8,
      success: (compressedResult) => {
        form.append("file", compressedResult);
        userService.editQuestionImage(form, question._id);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  };
  return (
    <Card className="">
      <CardHeader>
        <h2>Upload an image</h2>
      </CardHeader>
      <CardContent>
        <Input
          accept="image/*,capture=camera"
          type="file"
          onChange={(event) => handleCompressedUpload(event)}
        />
        <Button>Upload</Button>
      </CardContent>
    </Card>
  );
};
