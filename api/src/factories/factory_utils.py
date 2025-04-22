from enum import Enum
from importlib import import_module

from src.settings.app_settings import app_settings


class FactoryType(str, Enum):
    CHAT_MODEL = "chat_model"
    EMBEDDING_MODEL = "embedding_model"
    VECTOR_STORE = "vector_store"


def get_factory_from_settings(factory_type: FactoryType) -> type:
    """
    Returns the factory class based on the environment variable from settings.
    """
    factory_name = getattr(app_settings, factory_type.value)
    if isinstance(factory_name, Enum):
        factory_name = factory_name.value
    factory_module = import_module(
        f"src.factories.{factory_type.value}_factories"
    )
    factory_class = getattr(factory_module, f"{factory_name}Factory")
    return factory_class
