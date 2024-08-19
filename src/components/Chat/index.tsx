'use client'

import { useState } from 'react'
import { cn } from '@/utils/css'
import { Messages } from '@/components/Messages'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyScreen } from '@/components/EmptyScreen'
import { useScrollAnchor } from '@/hooks/useScrollAnchor'

export interface ChatProps extends React.ComponentProps<'div'> {}

export function Chat({ className }: ChatProps) {
  const [input, setInput] = useState('')
  const [messages] = useState([])

  const { messagesRef, scrollRef, visibilityRef } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <Messages messages={messages}/>
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
