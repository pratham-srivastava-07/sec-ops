"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@ops/ui"
import { Avatar, AvatarFallback } from "@ops/ui"
import { testimonial } from "@/constants/data"

export function TestimonialSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12">
              <motion.p
                className="text-2xl md:text-3xl mb-6 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                "{testimonial.quote}"
              </motion.p>
              <motion.div
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-orange-500 text-white">{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
