import { getExtracted, getTranslations } from "next-intl/server";
import { FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6";

export default async function Callout({ type = "simple", title, children }: {
  type?: "simple" | "info" | "caution" | "danger" | "thought";
  title?: string;
  children: React.ReactNode;
}) {
  const t = await getExtracted();

  return (
    <>
      { type === "thought" ? (
        <figure className='text-sm rounded-2xl bg-black/6 px-6 py-4 callout'>
          {children}
        </figure>
      ) :
        <figure className={
          'border-[3px] rounded-2xl px-6 py-4 callout text-[.95em] ' +
          (( type === "info" || type === "simple" ) ? 'bg-[#1388b9]/8 border-[#1388b9]' : '' ) +
          (type === "caution" ? 'bg-[#ac7f04]/8 border-[#ac7f04]' : '' ) + 
          (type === "danger" ? 'bg-[#b91313]/8 border-[#b91313]' : '' )
        }>
          { type !== "simple" && 
            <div className={
              'flex mb-3 mt-0.75 gap-2 ' +
              (type === "info" ? 'text-[#1388b9]' : '') +
              (type === "caution" ? 'text-[#ac7f04]' : '') +
              (type === "danger" ? 'text-[#b91313]' : '')
            }>
              { type === "info" && <FaCircleInfo className='w-4 h-4 text-[#1388b9] mt-[2px]' /> }
              { type === "caution" && <FaTriangleExclamation className='w-4 h-4 text-[#ac7f04] mt-[2px]' /> }
              { type === "danger" && <FaCircleExclamation className='w-4 h-4 text-[#b91313] mt-[2px]' /> }
              <span className='text-sm font-bold'>
                { title || (type === "info" ? t("情報") : type === "caution" ? t("注意") : type === "danger" ? t("警告") : "") }
              </span>
            </div>
          }
          <div>
            {children}
          </div>
        </figure>
      }
    </>
  )
}