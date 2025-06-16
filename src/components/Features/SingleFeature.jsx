/* prettier-ignore-file */
/* eslint-disable */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SingleFeature = ({ feature, formatDatasetName }) => {
  const { icon, name, description } = feature;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col h-full animate_top z-40 rounded-lg border border-gray-100 hover:border-primary bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
    >
      {/* Image Container */}
      <div className="relative w-full h-[200px] flex items-center justify-center rounded-md bg-white overflow-hidden dark:bg-blacksection">
        {/* <Image src={icon} alt={name} fill className="object-contain" /> */}
        <Image
          src={
            name === 'Bubble_ID_Dataset'
              ? '/images/icon/BubbleID.png'
              : name === 'Condensation_Dataset'
              ? '/images/icon/Condensation.png'
              : name === 'Immersion_Cooling_Dataset'
              ? '/images/icon/ImmersionCooling.png'
              : '/images/icon/db.png'
            }
          alt={name} fill className="object-contain" />
      </div>

      {/* Title */}
      <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
        {name
          ?.split('_')                            // split into words
          .filter((w, i, arr) =>                  // remove "dataset" if it’s the last word
            i !== arr.length - 1 || w.toLowerCase() !== 'dataset'
          )
          .join(' ')                              // join back with space
        }
      </h3>

      {/* Description */}
      <p className="mb-5 text-gray-600 dark:text-gray-300">{description}</p>

      {/* Learn More Link */}
      <Link
        href="/datasets"
        className="inline-block mt-auto pt-2 text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
      >
        Learn more
      </Link>
    </motion.div>
  );
};

export default SingleFeature;
