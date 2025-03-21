import { getComments } from "@/api/getAPI";
import { addComment } from "@/api/updateAPI";
import { Comment } from "@/types/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowBendUpLeftFill } from "react-icons/pi";

const Comments = ({ task }: { task: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [subCommentText, setSubcommentText] = useState("");
  const [showSubcomment, setShowSubcomment] = useState<number | null>(null);

  const fetchComments = async (task: number) => {
    try {
      const response = await getComments(task);
      setComments(response);
      console.log("comments: ", response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    if (task) {
      fetchComments(task);
    }
  }, [task]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // const handleReplyInputChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setSubcommentText(event.target.value);
  // };

  const handleSendComment = async (parent_id?: number) => {
    const content = parent_id ? subCommentText : text;
    if (!content?.trim()) return;

    // if (text.trim() === "") {
    //   return;
    // }

    try {
      await addComment(task, { text: content, parent_id });
      //await addComment(task, { text, parent_id });
      setText("");
      if (parent_id) {
        setSubcommentText("");
      }
      await fetchComments(task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[741px] bg-[#F8F3FEA6]/[65%] px-[45px] pt-10 pb-[52px] border-[0.3px] border-[#DDD2FF] rounded-[10px] mt-[59px]">
      <div className="w-full bg-white border-[0.3px] border-[#ADB5BD] rounded-[10px] px-5 pt-[18px] pb-[15px]">
        <textarea
          name="comment"
          id="comment"
          placeholder="დაწერე კომენტარი"
          // className="resize-none outline-none w-full text-sm bg-white border-[0.3px] border-[#ADB5BD] rounded-[10px]"
          className="block resize-none outline-none w-full text-sm bg-white py-2.5"
          onChange={handleInputChange}
          value={text}
        ></textarea>
        <div className="flex justify-end mt-[6px]">
          <button
            onClick={() => handleSendComment()}
            className="h-[35px] text-base text-white bg-[#8338EC] hover:bg-[#B588F4] focus:bg-[#B588F4] px-5 rounded-[20px] cursor-pointer"
          >
            დააკომენტარე
          </button>
        </div>
      </div>
      <p className="flex items-center gap-2 font-medium text-xl text-black mt-[66px] mb-10">
        კომენტარები
        <span className="flex justify-center text-sm text-white bg-[#8338EC] px-2.5 rounded-[30px]">
          {comments.length}
        </span>
      </p>

      <div className="space-y-[38px]">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-[38px] h-[38px]">
              <Image
                src={comment.author_avatar}
                alt="avatar"
                width={38}
                height={38}
                className="w-full h-full object-cover rounded-full"
                unoptimized
              />
            </div>
            <div className="grow">
              <p>{comment.author_nickname}</p>
              <p className="mt-2">{comment.text}</p>
              <div>
                <button
                  onClick={() => {
                    setShowSubcomment((prev) =>
                      prev === comment.id ? null : comment.id
                    );
                    setSubcommentText("");
                  }}
                  className="flex items-center gap-2 text-xs hover:text-[#B588F4] focus:text-[#B588F4] text-[#8338EC] mt-2.5 cursor-pointer"
                >
                  <PiArrowBendUpLeftFill size={16} />
                  უპასუხე
                </button>
                <div
                  className={`${
                    showSubcomment == comment.id ? "block" : "hidden"
                  } py-5`}
                >
                  <textarea
                    //rows={1}
                    name="subComment"
                    id="subComment"
                    className="resize-none outline-none w-full text-sm bg-white border-[0.3px] border-[#ADB5BD] rounded-[10px] px-2.5 py-1"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        handleSendComment(comment.id);
                        setShowSubcomment(null);
                      }
                    }}
                    onChange={(event) => setSubcommentText(event.target.value)}
                    value={subCommentText}
                  ></textarea>
                </div>
                <div className="space-y-2.5 mt-5">
                  {comment.sub_comments.map((sub) => (
                    <div key={sub.id} className="flex gap-3">
                      <div className="w-[38px] h-[38px]">
                        <Image
                          src={sub.author_avatar}
                          alt="avatar"
                          width={38}
                          height={38}
                          className="w-full h-full object-cover rounded-full"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-medium text-lg leading-[22px]">
                          {sub.author_nickname}
                        </p>
                        <p className="text-base leading-[19px] mt-2">
                          {sub.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
