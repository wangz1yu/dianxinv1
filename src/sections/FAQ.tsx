import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: '点薪云适合哪些类型的企业？',
    answer:
      '适用于存在灵活用工场景的企业，例如外卖配送、网约车、物流仓储、家政服务与零售门店等。我们支持从中小团队到多城市集团化运营。',
  },
  {
    question: '从接入到上线一般需要多久？',
    answer:
      '标准化接入通常 3-7 个工作日可完成。若涉及 API 深度对接、报表定制或多主体管理，通常在 2-4 周内分阶段上线。',
  },
  {
    question: '你们如何保障结算与税务合规？',
    answer:
      '平台提供实名校验、合同留痕、发薪记录与税务处理能力，并支持风控策略配置和全流程可追溯，帮助企业满足审计与合规要求。',
  },
  {
    question: '保险保障如何计费与生效？',
    answer:
      '支持按天计费、按人投保，次日生效。企业可按业务波峰灵活开通，降低固定成本，同时获得工伤与意外场景保障。',
  },
  {
    question: '如何开始试用或获得评估方案？',
    answer:
      '可在“联系我们”页面提交需求，我们会根据行业、人数规模、发薪频次给出初步方案与上线计划，并安排顾问跟进。',
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">常见问题</h2>
          <p className="text-gray-600">把用户最关心的问题提前说明，降低沟通门槛与决策成本。</p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border border-gray-200 rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-1 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
