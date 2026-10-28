import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-books'
import { useRouter } from 'next/router'

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // 만일에 상황에 대비하는 대체역할 옵션
    // fallback: false // 404 Not Found 반환
    // fallback: 'blocking' 즉시 생성(SSR방식)
    fallback: true, // 즉시 생성 (SSR방식) + Props가 없는 페이지 반환
  }
}
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id
  const book = await fetchOneBook(Number(id))
  if (!book) {
    return {
      notFound: true,
    }
  }
  return {
    props: { book },
  }
}

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  
  if (router.isFallback) return '로딩중입니다.'
  if (!book) return '문제가 발생했습니다. 다시 시도하세요'
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_containet}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  )
}
