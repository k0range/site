import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'
import { emojiToTwemojiUrl } from '@/utils/emojiToTwemojiUrl'
import Image from 'next/image';
import { IconType as ReactIconType } from 'react-icons/lib';
import { IconType as SiIconType } from '@icons-pack/react-simple-icons';

export default async function ArticleLayout({ children, title, badges, afterContent, heroCoverImg, heroCoverCss, heroCoverLogo, heroCoverLogoPyPercent, heroEmoji, heroIcon }: {
  children: React.ReactNode;
  title: string;
  badges?: React.ReactNode;
  afterContent?: React.ReactNode;
  heroCoverImg?: string;
  heroCoverCss?: string;
  heroCoverLogo?: string;
  heroCoverLogoPyPercent?: number;
  heroEmoji?: string;
  heroIcon?: ReactIconType | SiIconType;
}) {
  const HeroIcon = heroIcon;

  return (
    <div className="2xl:mx-2 rounded-t-[3rem] mt-10 flex flex-col page_transition">
      <div className="h-34 sm:h-45 bg-[#5CADCF] rounded-t-[2rem] sm:rounded-t-[3rem] flex flex-col justify-center" style={{
        backgroundImage: heroCoverCss ?? "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: heroCoverCss ? "cover" : "870px",
        backgroundRepeat: heroCoverCss && "no-repeat",
        backgroundPosition: heroCoverCss && "center"
      }}>
        { heroCoverImg && <Image fill src={heroCoverImg} alt="" /> }
        { heroCoverLogo && <div className="absolute inset-0" style={{
          top: heroCoverLogoPyPercent && Math.round(heroCoverLogoPyPercent * 1.125) + "%", // デカい表示だと余白多めのほうがよく見えるので少し足す
          bottom: heroCoverLogoPyPercent && Math.round(heroCoverLogoPyPercent * 1.125) + "%",
        }}>
          <div className="h-full relative">
            <Image fill src={heroCoverLogo} alt={`${title} Logo`} className="absolute inset-0 w-auto object-contain" />
          </div>
        </div> }
        { heroEmoji && (
          <img src={emojiToTwemojiUrl(heroEmoji)} alt={heroEmoji} className="w-16 sm:w-20 h-16 sm:h-20 mx-auto" style={{
            filter: `drop-shadow(0 0 1px #fdf6ee) drop-shadow(0 0 0.1px #fdf6ee) drop-shadow(0 0 0.1px #fdf6ee) drop-shadow(0 0 0.1px #fdf6ee) drop-shadow(0 0 0.1px #fdf6ee) drop-shadow(0 0 0.1px #fdf6ee)`,
          }} />
        ) }
        { heroIcon && <HeroIcon className="w-16 sm:w-20 h-16 sm:h-20 mx-auto" /> }
      </div>
      <div className="py-9 px-[1.25rem] sm:p-11 bg-[#FDF6EE] text-[#333333] rounded-b-[2rem] sm:rounded-b-[3rem] flex-1 mb-8">
        <div className="text-center">
          <h1 className="text-[1.75rem] page_transition">{title}</h1>
          { badges && <div className="mt-4 flex justify-center gap-2 page_transition">
            {badges}
          </div> }
          <DashedContainerDivider className="mt-8 mx-4 sm:mx-8 page_transition" />
        </div>
    
        <article className="mt-10 articleContent page_transition">
          {children}
        </article>

        { afterContent && <div className='mt-10 page_transition'>
          {afterContent}
        </div> }
      </div>
    </div>
  )
}
