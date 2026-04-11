from django.conf import settings
from .prompts import get_system_prompt, PLACEHOLDER_RESPONSES


def call_ai(request_type: str, user_input: str, problem=None) -> str:
    """
    Call OpenAI if API key is set, otherwise return placeholder.
    Swap gpt-4o-mini for any model you prefer.
    """
    if not settings.OPENAI_API_KEY:
        return PLACEHOLDER_RESPONSES.get(request_type, "AI service not configured.")

    try:
        from openai import OpenAI
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'system',  'content': get_system_prompt(request_type, problem)},
                {'role': 'user',    'content': user_input},
            ],
            max_tokens=500,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as exc:
        raise RuntimeError(f"OpenAI error: {exc}") from exc
