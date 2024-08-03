import styles from "../styles/HomeNoAuth.module.scss";

import { ReactNode, useEffect } from "react";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "../src/services/courseService";

import HeaderNoAuth from "@/src/components/HomeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/HomeNoAuth/presentationSection";
import CardsSection from "@/src/components/HomeNoAuth/cardsSection";
import SlideSection from "@/src/components/HomeNoAuth/slideSection";
import Footer from "@/src/components/common/footer";

import AOS from "aos";
import "aos/dist/aos.css";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>

        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={course} />
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};
export default HomeNoAuth;
