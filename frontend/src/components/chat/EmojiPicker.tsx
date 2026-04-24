import { userThemeStore } from "@/stores/useThemeStore"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
interface EmojiPickerProps {
    onChange: (value: string) => void;
}
const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const { isDark } = userThemeStore();
    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <Smile className="size-4" />
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={0}
            className="w-fit bg-transparent border-none shadow-none drop-shadow-none mb-12">
                <Picker
                    theme={isDark ? "dark" : "light"}
                    data={data}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                    emojiSize={24}
                />
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPicker