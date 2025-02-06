import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useWindowSize } from "react-use";
import { Howl } from "howler";

const sound = new Howl({
  src: ["/sweet-piano.mp3"],
  loop: true,
  volume: 0.5,
});

export default function ValentineCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Отключаем скролл
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleOpen = () => {
    if (!recipient) return;
    setIsOpen(true);
    setShowConfetti(true);
    sound.play();
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4 relative">
      {showConfetti && (
        <ReactConfetti width={width} height={height} recycle={false} />
      )}

      {/* Иконка Telegram */}
      <a
        href="https://t.me/A114you" // Замените на свою ссылку
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors"
      >
        <PaperAirplaneIcon className="w-6 h-6 text-pink-500" />
      </a>

      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full"
          >
            <div className="text-center space-y-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <HeartIcon className="w-20 h-20 text-pink-500 mx-auto" />
              </motion.div>

              <input
                type="text"
                placeholder="Введите ваше имя"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-pink-400 text-center text-lg"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                disabled={!recipient}
                className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Открыть открытку
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full space-y-6 text-center"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <HeartIcon className="w-20 h-20 text-red-500 mx-auto" />
              </motion.div>

              <h1 className="text-3xl font-bold text-pink-600">
                С Днём Святого Валентина, {recipient}!
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-lg"
              >
                Пусть этот день наполнится любовью, теплом и радостью. Спасибо,
                что ты есть в моей жизни! 💖
              </motion.p>
            </div>

            <div className="flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i }}
                >
                  <HeartIcon className="w-8 h-8 text-pink-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
