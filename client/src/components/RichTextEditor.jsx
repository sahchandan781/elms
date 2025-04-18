import { Textarea } from "@/components/ui/textarea"
const RichTextEditor = ({input, setInput}) => {
    const handleChange = (content) => {
        setInput({...input, description:content});
    }
  return (

<Textarea placeholder="" value={input.description}  onChange={handleChange} />
  )
}

export default RichTextEditor