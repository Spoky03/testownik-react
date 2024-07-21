import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addQuestionSet } from "../../reducers/userReducer";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const FormSchema = z.object({
  name: z.string().min(4).max(32),
  description: z.string().max(500),
});
export const NewSetForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.name.trim() === "") {
      toast({
        variant: "destructive",
        title: "Name of set cannot be empty",
        description: "Please provide a name for your set",
      });
      return;
    }
    const res = await dispatch(
      addQuestionSet({ name: data.name, description: data.description })
    );
    console.log("res", res);
    if (res.response.data.error) {
      toast({
        variant: "destructive",
        title: "Failed to create set",
        description: res.response.data.message,
      });
      return;
    }
    toast({
      variant: "success",
      title: `Set ${data.name} created`,
      description: "You can now add questions to your set",
      action: (
        <ToastAction
          altText="Add questions"
          onClick={() => navigate(`/profile/sets/${res}`)}
        >
          Add questions
        </ToastAction>
      ),
    });
    form.reset();
    setShowModal(false);
  };
  return (
    <div className="flex flex-col place-content-center gap-5 bg-ternary p-8">
      <h1 className="place-self-center font-semibold text-lg">
        Create new set
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-6 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="name of set" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="description" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};
// export const NewSetFormO = ({
//   setShowModal,
// }: {
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const [nameOfSet, setNameOfSet] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (nameOfSet.trim() === "") {
//       toast({
//         variant: "destructive",
//         title: "Name of set cannot be empty",
//         description: "Please provide a name for your set",
//       });
//       return;
//     }
//     const res = await dispatch(
//       addQuestionSet({ name: nameOfSet, description })
//     );
//     console.log("res", res);
//     if (res.response.data.error) {
//       toast({
//         variant: "destructive",
//         title: "Failed to create set",
//         description: res.response.data.message,
//       });
//       return;
//     }
//     toast({
//       variant: "success",
//       title: `Set ${nameOfSet} created`,
//       description: "You can now add questions to your set",
//       action: (
//         <ToastAction
//           altText="Add questions"
//           onClick={() => navigate(`/profile/sets/${res}`)}
//         >
//           Add questions
//         </ToastAction>
//       ),
//     });
//     setShowModal(false);
//     setNameOfSet("");
//     setDescription("");
//   };
//   return (
//     <div className="flex flex-col place-content-center gap-5 bg-ternary p-8">
//       <h1 className="place-self-center font-semibold">Create new set</h1>
//       <form
//         className="place-self-center flex gap-1 justify-center flex-col"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex place-self-center flex-col gap-3 ">
//           <div className="flex place-self-center gap-3">
//             <Input
//               type="nameOfSet"
//               id="nameOfSet"
//               className="rounded-md shadow-sm "
//               placeholder="Name of your set"
//               value={nameOfSet}
//               onChange={(e) => setNameOfSet(e.target.value)}
//             />
//             <div className="place-self-start">
//               <Button
//                 type="submit"
//                 variant={"outline"}
//                 className=""
//                 size={"icon"}
//               >
//                 {<MdAdd className="h-6 w-6" />}
//               </Button>
//             </div>
//           </div>
//           <Textarea
//             placeholder="Description"
//             id="description"
//             className="rounded-md shadow-sm place-self-center"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };
