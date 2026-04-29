import { cn, formatMessageTime } from "@/lib/utils";
import type { Conversation, Message, Participant } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface MessageItemsProps {
    message: Message;
    index: number;
    messages: Message[];
    selectedConvo: Conversation;
    lastMessageStatus: "delivered" | "seen";
}
const MessageItems = ({ message,
    index,
    messages,
    selectedConvo,
    lastMessageStatus }: MessageItemsProps) => {
    const prev = index + 1 < messages.length ? messages[index + 1] : undefined;
    const isShowTime =
        index + 1 === 0 ||
        new Date(message.createdAt).getTime() -
        new Date(prev?.createdAt || 0).getTime() >
        600000; // 5 phút

    const isGroupBreak = isShowTime || message.senderId !== prev?.senderId;

    const participant = selectedConvo.participants.find(
        (p: Participant) => p._id.toString() === message.senderId.toString()
    )

    return (
        <>
            <div className={cn("flex message-bounce gap-2", message.isOwn ? "justify-end" : "justify-start")}>
                {/* avatar */}
                {!message.isOwn && (
                    <div className="w-8">
                        {isGroupBreak && (
                            <UserAvatar type="chat"
                                name={participant?.displayName ?? "Emoji"}
                                avatarUrl={participant?.avatarUrl ?? undefined}
                            />
                        )}
                    </div>
                )}
                {/* message */}
                <div className={cn("max-w-xs lg:max-w-md space-y-1 flex flex-col",
                    message.isOwn ? "items-end" : "items-start")}>
                    <div className={cn("group flex items-center gap-2", message.isOwn ? "flex-row" : "flex-row-reverse")}>
                        <span
                            className={cn(
                                "text-xs flex text-muted-foreground px-1 mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            )}
                        >
                            {formatMessageTime(
                                new Date(message.createdAt)
                            )}
                        </span>
                        <Card className={cn("p-3 mt-2 ",
                            message.isOwn ? "chat-bubble-sent border-0" : "chat-bubble-received")}>
                            <p className="text-sm leading-relaxed break-words">{message.content}</p>
                        </Card>
                    </div>

                    {/* seen || delivered */}
                    {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
                        <Badge
                            variant="outline"
                            className={cn("text-xs px-1.5 py-0.5 h-4 border-0",
                                lastMessageStatus === "seen" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}
                        >
                            {lastMessageStatus}
                        </Badge>
                    )}
                </div>
            </div >
            {/* time */}
            {isShowTime && (
                <span className="flex justify-center text-xs text-muted-foreground px-1">
                    {formatMessageTime(new Date(message.createdAt))}
                </span>
            )}
        </>
    )
}

export default MessageItems